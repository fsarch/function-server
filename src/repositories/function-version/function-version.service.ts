import { Injectable } from '@nestjs/common';
import { IsNull, LessThanOrEqual, Not, Repository } from "typeorm";
import { FunctionVersion } from "../../database/entities/function-version.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { FunctionVersionSetDto } from "../../models/function-version.model.js";

@Injectable()
export class FunctionVersionService {
  constructor(
    @InjectRepository(FunctionVersion)
    private readonly functionVersionRepository: Repository<FunctionVersion>,
  ) {
  }

  public async GetActiveVersion(functionId: string) {
    return this.functionVersionRepository.findOne({
      where: {
        functionId,
        isActive: true,
        publishTime: LessThanOrEqual(new Date()),
      },
    });
  }

  public async GetVersion(functionId: string, versionId: string) {
    return this.functionVersionRepository.findOne({
      where: {
        functionId,
        id: versionId,
      },
    });
  }

  public async ListVersions(functionId: string) {
    return this.functionVersionRepository.find({
      where: {
        functionId,
      },
    });
  }

  async Set(functionId: string, setDto: FunctionVersionSetDto) {
    let functionVersion = await this.functionVersionRepository.findOne({
      where: {
        functionId,
        isActive: false,
        publishTime: IsNull(),
      },
      order: {
        creationTime: 'DESC',
      },
    });

    if (!functionVersion) {
      functionVersion = this.functionVersionRepository.create({
        id: crypto.randomUUID(),
        functionId,
        isActive: false,
        publishTime: null,
        code: setDto.code,
      });
    }

    functionVersion.code = setDto.code;
    // Only touch name/description when explicitly provided, so repeated
    // saves of the code alone don't wipe out previously set metadata.
    if (setDto.name !== undefined) {
      functionVersion.name = setDto.name;
    }
    if (setDto.description !== undefined) {
      functionVersion.description = setDto.description;
    }

    await this.functionVersionRepository.save(functionVersion);

    return functionVersion;
  }

  public async PublishLatest(functionId: string) {
    let functionVersion = await this.functionVersionRepository.findOne({
      where: {
        functionId,
        isActive: false,
        publishTime: IsNull(),
      },
      order: {
        creationTime: 'DESC',
      },
    });

    if (!functionVersion) {
      return null;
    }

    return this.Publish(functionId, functionVersion.id);
  }

  public async Publish(functionId: string, versionId: string) {
    // No isActive/publishTime constraint here: this also has to find versions
    // that were already published before (and are currently inactive), so a
    // caller can roll back to an older version, not just publish a fresh draft.
    let functionVersion = await this.functionVersionRepository.findOne({
      where: {
        id: versionId,
        functionId,
      },
    });

    if (!functionVersion) {
      return null;
    }

    functionVersion.isActive = true;
    // Keep the original first-publish timestamp when re-activating a version
    // that was published before; only stamp it on the very first publish.
    if (!functionVersion.publishTime) {
      functionVersion.publishTime = new Date();
    }

    await this.functionVersionRepository.manager.transaction(async (entityManager) => {
      await entityManager.update(FunctionVersion, {
        functionId,
        publishTime: Not(IsNull()),
      }, {
        isActive: false,
      });

      await entityManager.save(functionVersion);
    });

    return functionVersion;
  }
}
