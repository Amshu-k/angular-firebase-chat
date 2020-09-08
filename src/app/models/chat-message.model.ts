export class ChatMessage {
    $key?: string;
    email?: string;
    username?: string;
    message?: string;
    timeStamp?: Date = new Date();
}