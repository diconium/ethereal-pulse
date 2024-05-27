import { MongoClient, MongoClientOptions } from 'mongodb';
import AcsEmailSender from './acsEmailSender';
import NodemailerEmailSender from './nodemailerEmailSender';
import AWSEmailSender from './awsEmailSender';
import nodemailer from 'nodemailer';

interface EmailParams {
    senderAddress: string;
    recipientAddress: string;
    subject: string;
    content: string;
}

interface DbConfig {
    uri: string;
    dbName: string;
    collectionName: string;
    smtpConfig: nodemailer.SentMessageInfo;
    awsConfig: AWS.SES.Types.ClientConfiguration;
}

class AcsEmailSdk {
    private client: MongoClient;
    private db: any;

    constructor(private dbConfig: DbConfig, private emailMethod: 'acs' | 'nodemailer' | 'aws') {
        this.initDbConnection();
    }

    private async initDbConnection(): Promise<void> {
        try {
            this.client = new MongoClient(this.dbConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions);
            await this.client.connect();
            this.db = this.client.db(this.dbConfig.dbName);
            console.log('Connected to database');
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw new Error('Database connection failed');
        }
    }

    private async fetchConnectionString(): Promise<string> {
        try {
            const collection = this.db.collection(this.dbConfig.collectionName);
            const config = await collection.findOne({ key: 'acsConnectionString' });
            if (!config || !config.value) {
                throw new Error('Connection string not found in database');
            }
            return config.value;
        } catch (error) {
            console.error('Error fetching connection string:', error);
            throw new Error('Failed to fetch connection string from database');
        }
    }

    async sendEmail(emailParams: EmailParams): Promise<any> {
        let EmailSenderClass;
        switch (this.emailMethod) {
            case 'acs':
                const connectionString = await this.fetchConnectionString();
                EmailSenderClass = new AcsEmailSender(connectionString);
                break;
            case 'nodemailer':
                EmailSenderClass = new NodemailerEmailSender(this.dbConfig.smtpConfig);
                break;
            case 'aws':
                EmailSenderClass = new AWSEmailSender(this.dbConfig.awsConfig);
                break;
            default:
                throw new Error('Invalid email method. Choose "acs", "nodemailer", or "aws".');
        }

        return EmailSenderClass.sendEmail(emailParams);
    }
}

export default AcsEmailSdk;
