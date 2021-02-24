interface SideNote {}

class SideNote {
    key: number;
    user: string;
    date: Date;
    content: string;

    constructor(key: number, user: string, date: Date, content: string) {
        this.key = key;
        this.user = user;
        this.date = date;
        this.content = content;
    }
}
