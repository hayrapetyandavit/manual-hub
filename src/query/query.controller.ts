import { Body, Controller, Post } from '@nestjs/common';
import { QueryService } from './query.service';
import { IsString } from 'class-validator';

export class AskQuestionDto {
  @IsString()
  question: string;
}

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  async askQuestion(@Body() body: AskQuestionDto) {
    const answer = await this.queryService.askQuestion(body.question);
    return { answer };
  }
}
