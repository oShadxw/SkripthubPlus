export let allSyntax = [];

export function createSyntax(post) {
    allSyntax.push({
        "syntax": {
            "id": post.id,
            "title": post.title,
            "pattern": post.syntax_pattern,
            "description": post.description,
            "type": post.syntax_type
        },
        "addon": {
            "name": post.addon.name
        }
    });
}