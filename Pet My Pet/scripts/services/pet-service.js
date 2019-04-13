const petService = (() => {
    function addPet(pet) {
        return kinvey.post("appdata", "pets", "kinvey", pet);
    }

    function getAllPets(category) {
        return category !== "" && category !== "All" ?
                kinvey.get("appdata", `pets?query={"category":"${category}"}&sort={"likes": -1}`, "kinvey") :
                kinvey.get("appdata", `pets?sort={"likes": -1}`, "kinvey");
    }

    function getMyPets(userId) {
        return kinvey.get("appdata", `pets?query={"_acl.creator":"${userId}"}`, "kinvey")
    }

    function getById(petId) {
        return kinvey.get("appdata", `pets/${petId}`, "kinvey");
    }

    function editPet(petId, pet) {
        return kinvey.update("appdata", `pets/${petId}`, "kinvey", pet);
    }

    function deletePet(petId) {
        return kinvey.remove("appdata", `pets/${petId}`, "kinvey");
    }

    return {
        addPet,
        getAllPets,
        getMyPets,
        getById,
        editPet,
        deletePet
    }
})();