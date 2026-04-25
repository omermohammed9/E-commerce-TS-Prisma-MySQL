import cron from 'node-cron';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { IUserModel } from '../interfaces/IUserModel';

@injectable()
export class CronService {
    constructor(
        @inject(TYPES.IUserModel) private userModel: IUserModel
    ) {}

    public init() {
        // Run every day at midnight
        cron.schedule('0 0 * * *', async () => {
            console.log('[CronService] Running expired refresh token cleanup...');
            try {
                const deletedCount = await this.userModel.deleteExpiredRefreshTokens();
                console.log(`[CronService] Cleanup complete. Deleted ${deletedCount} tokens.`);
            } catch (error) {
                console.error('[CronService] Cleanup failed:', error);
            }
        });

        console.log('[CronService] Scheduled tasks initialized.');
    }
}
