const colors = require('colors')
const argv = require('yargs').argv;
const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contacts')


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contacts = await listContacts()
            console.table(contacts)
        break

        case 'get':
            const contactById = await getContactById(id)
            if (contactById) {
                console.log('We have found the contact'.zebra)
                console.log(contactById)
                return
            }      
                console.log('Error! Identification failed'.red)
           
        break

        case 'add':
            const newContact = await addContact(name, email, phone)
            console.log(colors.rainbow('New contact is created'))
            console.log(newContact)
        break

        case 'remove':
            const refreshedBase = await removeContact(id)
            console.table(refreshedBase)
        break

        default:
            console.warn('Unknown action type!'.red.bgCyan)
    }
}

invokeAction(argv)

