const tags = new Map([
    [ "All", {"name" : "All", "color" : "#000000" }],
    [ "FullStack", {"name" : "Full Stack", "color" : "#98bb26" }],
    [ "Backend", {"name" : "Back End", "color" : "#cc241d" }],
    [ "GameDev", {"name" : "Game Development", "color" : "#458588" }]
 ]);

class Project {
    constructor(title, description, link, image, tags) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.image = image;
        this.tags = tags;
    }

    generateCardElement() {
        let cardElement = document.createElement("div");
        cardElement.className = "card";
    
        let cardLinkElement = document.createElement("a");
        cardLinkElement.href = this.link;
    
        let cardImageElement = document.createElement("div");
        cardImageElement.className = "card-image";
        cardImageElement.style.backgroundImage = "url(" + this.image + ")";
        cardLinkElement.appendChild(cardImageElement);
        cardElement.appendChild(cardLinkElement);
    
        let cardBodyElement = document.createElement("div");
        cardBodyElement.className = "text-body";
    
        let cardTitleElement = document.createElement("h4");
        cardTitleElement.innerHTML = this.title;
        cardBodyElement.appendChild(cardTitleElement);
    
        let cardTextElement = document.createElement("p");
        cardTextElement.innerHTML = this.description;
        cardBodyElement.appendChild(cardTextElement);
    
        let tagContainer = this.generateTagBadges(this.tags);
        cardBodyElement.appendChild(tagContainer);
    
        cardElement.appendChild(cardBodyElement);
        return cardElement; 
    }    

    generateTagBadges(tagsToGenerate) {
        let tagContainer = document.createElement("div");
        tagContainer.className = "tag-container";
        for (let i = 0; i < tagsToGenerate.length; i++) {
            const element = tagsToGenerate[i];
            let tagElement = document.createElement("span");
            tagElement.className = "tag";
            tagElement.innerHTML = tags.get(element).name;
            tagElement.style.backgroundColor = tags.get(element).color;
            tagContainer.appendChild(tagElement);
        }
        return tagContainer;
    }
}

function previewCard() {
     // find data from input fields
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let link = document.getElementById("link").value;
    let image = document.getElementById("image").value;
    // Get image name
    image = image.split("\\").pop();
    image = "temporal_images/" + image;

    let tagList = document.getElementById("tags");
    let tags = [];
    for (let i = 0; i < tagList.childNodes.length; i++) {
        const element = tagList.childNodes[i];
        if (element.checked) {
            tags.push(element.value);
        }
    }

    project = new Project(title, description, link, image, tags);

    let previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = "";
    previewContainer.appendChild(project.generateCardElement());
    
}

function main() {

}

main();
