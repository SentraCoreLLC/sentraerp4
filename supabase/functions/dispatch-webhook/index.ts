import { Hono } from 'hono';
import crypto from 'crypto';
import { sendWebhook } from './sendWebhook';
import { logWebhookEvent } from './logWebhookEvent';

const app = new Hono();

const SECRET = process.env.WEBHOOK_SECRET;
const MAX_RETRIES = 5;

app.post('/dispatch-webhook', async (c) => {
    const { body } = await c.req.json();
    const signature = c.req.headers.get('X-Hub-Signature');

    if (!isValidSignature(body, signature)) {
        return c.text('Invalid signature', 401);
    }

    const retryCount = 0;
    try {
        await sendWebhook(body);
        await logWebhookEvent(body, 'success');
        return c.text('Webhook dispatched successfully');
    } catch (error) {
        await logWebhookEvent(body, 'error', error);
        await retryWebhook(body, retryCount);
        return c.text('Webhook dispatch failed, retrying...', 500);
    }
});

function isValidSignature(body: any, signature: string | null) {
    if (!signature) {
        return false;
    }
    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(JSON.stringify(body));
    const expectedSignature = `sha256=${hmac.digest('hex')}`;
    return expectedSignature === signature;
}

async function retryWebhook(body: any, retries: number) {
    if (retries < MAX_RETRIES) {
        try {
            await sendWebhook(body);
            await logWebhookEvent(body, 'success');
        } catch (error) {
            await logWebhookEvent(body, 'error', error);
            await retryWebhook(body, retries + 1);
        }
    }
}

export default app;