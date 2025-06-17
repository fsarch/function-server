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
    let functionVersion = await this.functionVersionRepository.findOne({
      where: {
        id: versionId,
        functionId,
        isActive: false,
        publishTime: IsNull(),
      },
    });

    if (!functionVersion) {
      return null;
    }

    functionVersion.isActive = true;
    functionVersion.publishTime = new Date();

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
