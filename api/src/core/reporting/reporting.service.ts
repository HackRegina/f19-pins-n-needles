import { Injectable } from '@nestjs/common';
import { ReportingEntity } from './reporting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from '../image/image.service';
import { Point } from 'geojson';
import uuidv4 = require('uuid/v4');
import sharp = require('sharp')

@Injectable()
export class ReportingService {

  constructor(
    @InjectRepository(ReportingEntity)
    private reportingRepository: Repository<ReportingEntity>,
    private imageService: ImageService,
  ) { }

  async create({position, image}): Promise<ReportingEntity> {
    const uuid = uuidv4();
    image.filename = `${uuid}.png`;
    image.value = await sharp(Buffer.from(image.value, 'base64')).toFormat('png').toBuffer();
    const { url } = await this.imageService.update(image, 'reportings');
    return this.reportingRepository.save({
      id: uuid,
      geolocation: { type: 'Point', coordinates: [position.longitude, position.latitude] } as Point,
      photoUrl: url,
    } as ReportingEntity);
  }
}
