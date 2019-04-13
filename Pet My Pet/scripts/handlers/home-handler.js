handlers.getHome = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    if (!userService.isAuth()) {
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/home/homePage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }

    let category = ctx.params.category.slice(1);
    petService.getAllPets(category).then(function(allPets) {
        ctx.pets = allPets.filter(p => p._acl.creator !== userService.getCurrentUserId());
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/home/homePage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }).catch(notify.handleError);
}