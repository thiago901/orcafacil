import { Injectable } from '@nestjs/common';

import { EnvService } from '../infra/envs/env.service';
import * as fs from 'fs';

import * as Handlebars from 'handlebars';
import {
  EmailProviderResponseProps,
  EmailProvider,
} from '@core/common/application/ports/providers/email-provider';
import { Resend } from 'resend';

@Injectable()
export class ResendEmailProvider implements EmailProvider {
  private resend: Resend;
  constructor(private readonly env: EnvService) {
    this.resend = new Resend(env.get('RESEND_EMAIL_KEY'));
  }

  async send({
    templatePath,
    variables,
    subject,
    to,
  }: EmailProviderResponseProps): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath, 'utf8');
    const compileTemplate = Handlebars.compile(templateFileContent);
    const html = compileTemplate(variables);
    await this.resend.emails.send({
      from: this.env.get('RESEND_EMAIL_FROM'),
      to,
      subject,
      html,
    });
  }
}
