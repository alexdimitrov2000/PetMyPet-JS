handlers.getAddPetPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    ctx.loadPartials({
        header: "../../views/common/header.hbs",
        footer: "../../views/common/footer.hbs"
    }).then(function () {
        this.partial("../../views/pet/addPetPage.hbs")
    }).catch(function (err) {
        notify.handleError(err);
    });
}

handlers.addPet = function (ctx) {
    let { name, description, imageURL, category } = { ...ctx.params };

    let pet = {
        name: name,
        description: description,
        imageURL: imageURL,
        category: category,
        likes: 0
    };

    petService.addPet(JSON.stringify(pet)).then(function (res) {
        console.log(res);
        notify.showInfo("Pet created.");
        ctx.redirect("/");
    }).catch(notify.handleError);
}

handlers.getMyPetsPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let userId = userService.getCurrentUserId();

    petService.getMyPets(userId).then(function (res) {
        ctx.myPets = res;
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs",
            pet: "../../views/pet/myPet.hbs"
        }).then(function () {
            this.partial("../../views/pet/myPetsPage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }).catch(notify.handleError);
}

handlers.getPetDetailsPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let petId = ctx.params.id;

    petService.getById(petId).then(function (res) {
        ctx.pet = res;
        ctx.isCreator = res._acl.creator === userService.getCurrentUserId();
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/pet/petDetailsPage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }).catch(notify.handleError);
}

handlers.getDeletePetPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let petId = ctx.params.id;

    petService.getById(petId).then(function (res) {
        ctx.pet = res;
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/pet/deletePetPage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }).catch(notify.handleError);
}

handlers.editPet = function (ctx) {
    let petId = ctx.params.id;
    let newDescription = ctx.params.description;

    petService.getById(petId).then(function (pet) {
        pet.description = newDescription;

        petService.editPet(petId, JSON.stringify(pet)).then(function () {
            notify.showInfo("Updated successfully!");
            ctx.redirect("#/myPets");
        }).catch(notify.handleError);
    })
}

handlers.petPet = function (ctx) {
    let petId = ctx.params.id;

    petService.getById(petId).then(function (res) {
        let pet = res;
        pet.likes += 1;

        petService.editPet(petId, JSON.stringify(pet)).then(function (res) {
            notify.showInfo(`Successfully pet ${pet.name}`);
            ctx.redirect(`#/details/${petId}`);
        }).catch(notify.handleError);
    }).catch(notify.handleError);
}

handlers.deletePet = function (ctx) {
    let petId = ctx.params.id;

    petService.deletePet(petId).then(function () {
        notify.showInfo("Pet removed successfully!");
        ctx.redirect("/");
    }).catch(notify.handleError);
}