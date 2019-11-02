import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import AWS = require('aws-sdk')
import { PutObjectRequest } from 'aws-sdk/clients/s3'

dotenv.config();

@Injectable()
export class ImageService {
  private s3;
  private s3url;

  constructor() {
    this.s3url = `https://s3.us-west-2.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}`
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
      },
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async update(picture, folder?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          ACL: 'public-read',
          Body: picture.value,
          ContentEncoding: 'base64',
          ContentType: 'image/png',
          Key: [folder, picture.filename].join('/')
        } as PutObjectRequest,
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve({
              ...data,
              url: `${this.s3url}/${folder}/${picture.filename}`
            })
          }
        }
      )
    })
  }

}
