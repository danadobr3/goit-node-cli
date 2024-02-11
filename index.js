import * as contactsHelper from "./contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsHelper.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const getContact = await contactsHelper.getContactById(id);
      console.table(getContact);
      break;

    case "add":
      const addUsers = await contactsHelper.addContact(name, email, phone);
      console.table(addUsers);
      break;

    case "remove":
          const removedContacts = await contactsHelper.removeContact(id);
          console.table(removedContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);