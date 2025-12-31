// ===== 读取JSON文件 =====
async function cuisineReader(filePath = "../res/data/dishes-database.json") {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`无法读取文件: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`读取 ${filePath} 失败:`, error);
        throw error;
    }
}

// ===== 加载slide组件内容 =====

async function loadSlideLinkAndImage() {
    try {
        const data = await cuisineReader();
        console.log(data);
        data["cuisine-list"].forEach((cuisineChild, index) => {
            // console.log(cuisineChild);
            slides[index].querySelector(
                "a"
            ).href = `../dish-intro.html?cuisine_id=${data["cuisine-list"][index]["id"]}&dish_id=${data["cuisine-list"][index]["dishes-list"][0]["id"]}`;
            slides[index].querySelector(
                "a"
            ).textContent = `${data["cuisine-list"][index]["name"]} - ${data["cuisine-list"][index]["dishes-list"][0]["name"]}`;
            slides[index].querySelector(
                "img"
            ).src = `../res/img/${data["cuisine-list"][index]["dishes-list"][0]["id"]}.webp`;
        });
    } catch (error) {
        console.error("显示图片资源失败：", error);
    }
}

// ===== 头部导航加载菜系名或菜品名 =====

async function loadCuisineMenuWithChild(obj, objChild) {
    try {
        const data = await cuisineReader();

        const cuisineContainers = document.querySelectorAll(obj);
        data["cuisine-list"].forEach((cuisine, cuisineIndex) => {
            let cuisineContainer = cuisineContainers[cuisineIndex];
            let titleLink = cuisineContainer.querySelector("a");
            titleLink.textContent = cuisine.name;
            titleLink.href = `../cuisine-intro.html?cuisine_id=${cuisine.id}`;

            if (objChild !== "") {
                const dishContainers =
                    cuisineContainer.querySelectorAll(objChild);
                cuisine["dishes-list"].forEach((dish, dishIndex) => {
                    const dishContainer = dishContainers[dishIndex];
                    const dishLink = dishContainer.querySelector("a");
                    dishLink.textContent = dish.name;
                    dishLink.href = `../dish-intro.html?cuisine_id=${cuisine.id}&dish_id=${dish.id}`;
                });
            }
        });
    } catch (error) {
        console.error("显示详细信息失败:", error);
    }
}

// ===== 动态加载菜系信息 =====

async function loadCuisineGrid(cuisineId) {
    try {
        const data = await cuisineReader();
        const cuisineGrid = document.querySelectorAll(".cuisine-info-grid");
        const dataObject = data["cuisine-list"].find(
            (cuisine) => cuisine.id === cuisineId
        );
        document.querySelector(
            ".cuisine-title-grid"
        ).textContent = `菜系介绍 - ${dataObject["name"]}`;
        for (let cuisineChild of cuisineGrid) {
            let tmpElement = cuisineChild.querySelector(".info-content-cell");
            if (typeof dataObject[cuisineChild.id] === "object") {
                // console.log(typeof dataObject[cuisineChild.id]);
                // console.log(dataObject[cuisineChild.id]);
                for (let tmpChild of dataObject[cuisineChild.id]) {
                    tmpElement.innerHTML += `<span class=\"info-content-cell-child\">${tmpChild}</span>`;
                }
            } else {
                // console.log(dataObject[cuisineChild.id]);
                tmpElement.textContent = dataObject[cuisineChild.id];
            }
        }
    } catch (error) {
        console.error("显示菜系信息失败：", error);
    }
}

// ===== 动态加载菜系图片 =====

async function loadCuisineImage(cuisineId) {
    try {
        const data = await cuisineReader();
        const cuisineImage = document.querySelectorAll(".cuisine-dishes-cell");
        const dataObject = data["cuisine-list"].find(
            (cuisine) => cuisine.id === cuisineId
        );
        cuisineImage.forEach((cuisineChild, index) => {
            // console.log(cuisineChild);
            // console.log(dataObject["dishes-list"][index]);
            cuisineChild.querySelector(
                "a"
            ).href = `../dish-intro.html?cuisine_id=${dataObject["id"]}&dish_id=${dataObject["dishes-list"][index]["id"]}`;
            cuisineChild.querySelector("span").innerHTML =
                dataObject["dishes-list"][index]["name"];
            cuisineChild.querySelector(
                "img"
            ).src = `../res/img/${dataObject["dishes-list"][index]["id"]}.webp`;
        });
    } catch (error) {
        console.error("显示图片资源失败：", error);
    }
}

// ===== 动态加载菜品信息 =====

async function loadDishGrid(cuisineId, dishId) {
    try {
        const cuisineData = await cuisineReader();
        const dishData = await cuisineReader(
            `../res/data/${cuisineId}-dishes.json`
        );
        const dishGrid = document.querySelectorAll(".dish-info-grid");
        const cuisineDataObject = cuisineData["cuisine-list"].find(
            (cuisine) => cuisine.id === cuisineId
        );
        const dishDataObject = dishData["dishes-list"].find(
            (dish) => dish.id === dishId
        );
        document.querySelector(
            ".dish-title-grid"
        ).textContent = `菜品介绍 - ${dishDataObject["name"]}`;
        document
            .querySelector(".dish-image-grid")
            .querySelector(
                "img"
            ).src = `../res/img/${dishDataObject["id"]}.webp`;
        document
            .querySelector(".dish-image-grid")
            .querySelector("span").textContent = dishDataObject["name"];
        for (let dishChild of dishGrid) {
            let tmpElement = dishChild.querySelector(".info-content-cell");
            if (typeof dishDataObject[dishChild.id] === "object") {
                // console.log(typeof dishDataObject[dishChild.id]);
                // console.log(dishDataObject[dishChild.id]);
                for (let tmpChild of dishDataObject[dishChild.id]) {
                    tmpElement.innerHTML += `<span class=\"info-content-cell-child\">${tmpChild}</span>`;
                }
            } else {
                // console.log(dishDataObject[dishChild.id]);
                tmpElement.textContent = dishDataObject[dishChild.id];
            }
        }
    } catch (error) {
        console.error("显示菜系信息失败：", error);
    }
}

// ===== 动态加载菜系导航界面 =====
async function loadClassicDishesGrid() {
    try {
        const data = await cuisineReader();
        const cuisineContainers = document.querySelectorAll(".cuisine-child");

        data["cuisine-list"].forEach((cuisine, cuisineIndex) => {
            const cuisineContainer = cuisineContainers[cuisineIndex];
            const titleElem = cuisineContainer.querySelector(
                ".cuisine-child-title"
            );
            const dishElems = cuisineContainer.querySelectorAll(
                ".cuisine-child-dish"
            );
            titleElem.textContent = cuisine.name;
            titleElem.href = `../cuisine-intro.html?cuisine_id=${cuisine.id}`;

            const dishImageElems = cuisineContainer.querySelectorAll("img");
            const dishSpanElems = cuisineContainer.querySelectorAll("span");
            cuisine["dishes-list"].forEach((dish, dishIndex) => {
                const dishImageElem = dishImageElems[dishIndex];
                const dishSpanElem = dishSpanElems[dishIndex];
                dishImageElem.src = `../res/img/${dish.id}.webp`;
                dishSpanElem.textContent = dish.name;
                dishElems[
                    dishIndex
                ].href = `../dish-intro.html?cuisine_id=${cuisine.id}&dish_id=${dish.id}`;
            });
        });
    } catch (error) {
        console.error("显示详细信息失败:", error);
    }
}

// ===== 读取菜品烹饪步骤 =====
async function loadCookingStep(cuisineId, dishId) {
    try {
        const data = await cuisineReader(
            `../res/data/${cuisineId}-dishes.json`
        );
        const cookingStepElem = document.querySelector(".dish-cooking-step-content");
        const dataObject = data["dishes-list"].find(
            (dish) => dish.id === dishId
        );
        dataObject["cooking-step"].forEach((cookingChildStep, index) => {
            // console.log(cookingChildStep);
            cookingStepElem.innerHTML += `<li>${cookingChildStep}</li>`
        });
    } catch (error) {
        console.error("显示图片资源失败：", error);
    }
}
