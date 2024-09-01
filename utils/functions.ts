const isEnvMissing = () => {
    let message: String = "";
    if(!process.env.DATABASE_URI) message+= "Missing DATABASE_URI environment variable\n";
    if(!process.env.DATABASE_USER) message+= "Missing DATABASE_USER environment variable\n";
    if(!process.env.DATABASE_URI) message+= "Missing DATABASE_URI environment variable\n";
    return message;
}