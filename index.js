// import { program } from "commander";
const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts.json");


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.table(getContact);
      break;

    case "add":
      const addUsers = await addContact(name, email, phone);
      console.table(addUsers);
      break;

    case "remove":
          const removedContacts = await removeContact(id);
          console.table(removedContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);