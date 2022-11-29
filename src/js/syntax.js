const syntaxs = [];

class syntax {
    
    constructor(addon, syntax_pattern, description, type) {
        this.addon = addon;
        this.syntax_pattern = syntax_pattern;
        this.description = description;
        this.type = type;
        syntaxs.push(this);
    }

    static get syntaxs() {
        return syntaxs;
    }
}