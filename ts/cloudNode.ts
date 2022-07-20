class cloudNode {
    id: string;
    title: string;
    children: cloudNode[];

    constructor(title: string) {
        this.title = title;
        this.id = "1",
        this.children = [];
    }
}