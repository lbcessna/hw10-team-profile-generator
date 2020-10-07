// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        if(!name) {
            throw new Error("You are missing the name.");
        }
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }

}

module.exports = Employee;