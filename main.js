let projects = [];
let selectedProject = null;


//Add event to file input
fileInput.addEventListener('change', readSingleFile, false);

function loadFile() {
    fileInput.click();
}

function loadFromURL() {
    // Open a prompt to get the URL
    let url = prompt("Enter the URL of the JSON file");
    if (url == null || url == "") {
        return;
    }
    // Get the JSON file
    fetch(url)
    .then(response => response.json())
    .then(data => displayContents(data.data));
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

function addProject() {
    showEditor();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("link").value = "";
    document.getElementById("image").value = "";
    let tagList = document.getElementById("tags");
    for (let i = 0; i < tagList.childNodes.length; i++) {
        const element = tagList.childNodes[i];
        element.checked = false;
    }
}

function saveProject() {
    // find data from input fields
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let link = document.getElementById("link").value;
    let image = document.getElementById("image").value;
    // Get image name
    image = image.split("\\").pop();
    image = "resources/" + image;

    let tagList = document.getElementById("tags");
    let tags = [];
    for (let i = 0; i < tagList.childNodes.length; i++) {
        const element = tagList.childNodes[i];
        if (element.checked) {
            tags.push(element.value);
        }
    }

    if (selectedProject == null) {
        project = new Project(title, description, link, image, tags);
        projects.push(project);
    } else {
        project = projects[selectedProject];
        project.title = title;
        project.description = description;
        project.link = link;
        project.image = image;
        project.tags = tags;
    }

    displayContents(projects);
    showList();
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
    previewCard()
}

function previewCard() {
     // find data from input fields
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let link = document.getElementById("link").value;
    let image = document.getElementById("image").value;
    // Get image name
    image = image.split("\\").pop();
    image = "resources/" + image;

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
