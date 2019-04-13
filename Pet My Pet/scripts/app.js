const handlers = {};

$(() => {
    const app = Sammy("#container", function() {
        this.use("Handlebars", "hbs");

        // home page routes
        this.get("/(/:category)?", handlers.getHome);
        this.get("#/home(/:category)?", handlers.getHome);
        this.get("/index.html(/:category)?", handlers.getHome);

        // user pages GET routes
        this.get("#/login", handlers.getLoginPage);
        this.get("#/register", handlers.getRegisterPage);
        this.get("#/logout", handlers.logoutUser);

        // user pages POST routes
        this.post("#/login", handlers.logUser);
        this.post("#/register", handlers.registerUser);

        // pet pages GET routes
        this.get("#/addPet", handlers.getAddPetPage);
        this.get("#/myPets", handlers.getMyPetsPage);
        this.get("#/details/:id", handlers.getPetDetailsPage);
        this.get("#/pet/:id", handlers.petPet);
        this.get("#/delete/:id", handlers.getDeletePetPage);
        
        // pet pages POST routes
        this.post("#/addPet", handlers.addPet);
        this.post("#/details/:id", handlers.editPet);
        this.post("#/delete/:id", handlers.deletePet);
    });

    app.run("/");
});