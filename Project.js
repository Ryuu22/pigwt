
class Project {
    constructor(title, description, link, image, tags, id = null) {
        this.id = id;
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
    
        //let tagContainer = this.generateTagBadges(this.tags);
        //cardBodyElement.appendChild(tagContainer);
    
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
    
    generatePostListElement() {
        let postItemElement = document.createElement("div");
        postItemElement.className = "post-item";
        if(this.id % 2) {
            postItemElement.classList.add("alternative-color");
        }

        let postItemThumbnailElement = document.createElement("div");
        postItemThumbnailElement.className = "post-item-thumbnail";
        postItemThumbnailElement.style.backgroundImage = "url(" + this.image + ")";
        postItemElement.appendChild(postItemThumbnailElement);

        let postItemTitleElement = document.createElement("div");
        postItemTitleElement.className = "post-item-title";
        postItemTitleElement.innerHTML = this.title;
        postItemElement.appendChild(postItemTitleElement);
        
        let postItemTagsElement = document.createElement("div");

        let tagContainer = this.generateTagBadges(this.tags);
        postItemTagsElement.appendChild(tagContainer);
        postItemElement.appendChild(postItemTagsElement);

        let postItemOptionsElement = document.createElement("div");
        postItemOptionsElement.className = "post-item-options";
        let editButton = document.createElement("button");
        editButton.type = "button";
        editButton.innerHTML = "Edit";
        editButton.onclick = function() { editPost(this); };
        postItemOptionsElement.appendChild(editButton);
        postItemElement.appendChild(postItemOptionsElement);

        return postItemElement;
    }

}
