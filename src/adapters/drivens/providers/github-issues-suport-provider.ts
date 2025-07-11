import {
  SendParams,
  SupportProvider,
} from '@core/common/application/ports/providers/suport-provider';

import { Injectable } from '@nestjs/common';
import { EnvService } from '../infra/envs/env.service';

@Injectable()
export class GitHubIssuesSuportProvider implements SupportProvider {
  constructor(private readonly env: EnvService) {}
  async send(data: SendParams): Promise<void> {
    await fetch(
      'https://api.github.com/repos/OrcaLink-com/support-app/issues',
      {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          labels: data.labels,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${this.env.get('GIT_HUB_KEY')}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'OrçaLink.com',
        },
      },
    );
  }
}
