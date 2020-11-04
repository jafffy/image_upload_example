document.addEventListener("DOMContentLoaded", function() {
    init();
}, false);

function init()
{
    fetch('http://localhost:3000/preference')
    .then(res => res.json())
    .then((preference) => {
        for (const entity of preference.entities) {
            if (entity.class === 'image_uploader') {
                if (entity.parent === 'body')
                    upload_image_file(document.body, entity);
            }
        }

    })
        .catch(err => { throw err });
}

function upload_image_file(parent, preference) {
    let form = document.createElement("form");
    form.method = "POST";
    form.enctype = "multipart/form-data";
    form.action = preference.api;
    parent.appendChild(form);

    let input_file = document.createElement("input");
    input_file.type = preference.type;
    input_file.name = "file";
    form.appendChild(input_file);

    let input_submit = document.createElement("input");
    input_submit.type = "submit";
    input_submit.value = preference.button_desc;
    form.appendChild(input_submit);
}