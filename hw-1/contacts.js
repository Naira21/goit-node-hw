const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const readContacts = async () => {
    const contactsPath = await fs.readFile(path.join(__dirname, 'db', 'contacts.json'), 'utf8',)
    const data = JSON.parse(contactsPath)
    return data
}
const listContacts = async () => {
  return await readContacts()
}

const getContactById = async (contactId) => {
  const contactsBase = await readContacts()
  const requestedContact = contactsBase.filter((contact) => contact.id === contactId)
  return requestedContact
}

const removeContact = async (contactId)=> {
  const contactsBase = await readContacts()
  const oddContact = contactsBase.filter((contact) => contact.id !== contactId)
   await fs.writeFile(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contactsBase, null, 2)
  )
  return oddContact
}

const addContact = async(name, email, phone) => {
  const contactsBase = await readContacts()
  const newContact = {id: uuidv4(), name, email, phone,}
  contactsBase.push(newContact)
  await fs.writeFile(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contactsBase, null, 2)
  )
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
 