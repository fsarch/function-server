import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { FunctionEntity } from "../../database/entities/function.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { FunctionCreateDto } from 'src/models/function.model.js';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(FunctionEntity)
    private readonly functionRepository: Repository<FunctionEntity>,
  ) {
  }

  public async ListServices() {
    return this.functionRepository.find();
  }

  public async Create(createDto: FunctionCreateDto) {
    const createdFunction = this.functionRepository.create({
      id: crypto.randomUUID(),
      name: createDto.name,
      externalId: createDto.externalId,
    });

    const savedFunction = await this.functionRepository.save(createdFunction);

    return savedFunction;
  }
}
