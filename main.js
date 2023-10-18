const tags = new Map([
    [ "All", {"name" : "All", "color" : "#000000" }],
    [ "FullStack", {"name" : "Full Stack", "color" : "#98bb26" }],
    [ "Backend", {"name" : "Back End", "color" : "#cc241d" }],
    [ "GameDev", {"name" : "Game Development", "color" : "#458588" }]
 ]);

let projects = [];
let selectedProject = null;

const listOfPostsPage = document.getElementById("list-of-posts");
const postEditorPage = document.getElementById("post-editor");
const postListContainer = document.getElementById("post-list-container");
const fileInput = document.getElementById("file-input");

//Add event to file input
fileInput.addEventListener('change', readSingleFile, false);

function loadFile() {
    fileInput.click();
}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        displayContents(JSON.parse(contents).data);
    };
    reader.readAsText(file);
}

function saveFile() {
    let data = JSON.stringify({"data": projects});
    saveAs("projects.json", data);
}

function saveAs(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function displayContents(data) {
    projects = data;
    postListContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        project = new Project(element.title, element.description, element.link, element.image, element.tags, i);
        postListContainer.appendChild(project.generatePostListElement());
    }
}

function showList() {
    listOfPostsPage.style.display = "block";
    postEditorPage.style.display = "none";
}

function showEditor() {
    listOfPostsPage.style.display = "none";
    postEditorPage.style.display = "block";
}

function editProject(project_id) {
    selectedProject = project_id;
    loadOnEditor(projects[project_id]);
}

function deleteProject(project_id, self) {
    document.getElementById("post-list-container").removeChild(self);
    projects.splice(projects.indexOf(project_id), 1);
    displayContents(projects);
}

function loadOnEditor(project) {
    showEditor();
    document.getElementById("title").value = project.title;
    document.getElementById("description").value = project.description;
    document.getElementById("link").value = project.link;
    //document.getElementById("image").value = project.image;
    let tagList = document.getElementById("tags");
    for (let i = 0; i < tagList.childNodes.length; i++) {
        const element = tagList.childNodes[i];
        if (project.tags.includes(element.value)) {
            element.checked = true;
        } else {
            element.checked = false;
        }
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
