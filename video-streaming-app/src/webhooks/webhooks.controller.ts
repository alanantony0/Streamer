import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { WebhooksService } from './webhooks.service';

@Controller('api/webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhooksService) {}

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ) {
    console.log('hi');

    try {
      //   const { svixId, svixTimestamp, svixSignature } = req.headers;

      if (!svixId || !svixTimestamp || !svixSignature) {
        return res.status(400).send('Error occurred -- no svix headers');
      }

      const body = JSON.stringify(req.body);

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

      let evt;

      try {
        evt = wh.verify(body, {
          'svix-id': String(svixId),
          'svix-timestamp': String(svixTimestamp),
          'svix-signature': String(svixSignature),
        });
      } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(400).send('Error occurred');
      }

      //   const { id } = evt.data;
      //   const eventType = evt.type;

      const emailAddress = evt.data.email_addresses[0].email_address;
      const userId = evt.data.id;
      return this.webhookService.signIn(emailAddress, userId);
      //   return res.status(200).send('');
    } catch (err) {
      console.error('Error handling webhook:', err);
      return res.status(500).send('Internal Server Error');
    }
  }
}
