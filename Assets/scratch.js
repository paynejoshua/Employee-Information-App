getId() {
    return this.id;
}

setName(name) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
}

getName() {
    return this.name;
}

setRole(role) {
    this.role = role.charAt(0).toUpperCase() + role.slice(1);
}

getRole(){
    return this.role;
}

setEmail(email){
    this.email = email;
}

getEmail(){
    return this.email;
}

setGithub(github){
    this.github = github;
}

getGithub(){
    return this.github;
}