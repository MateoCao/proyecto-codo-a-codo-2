// api.js

const API = {
    url: 'https://mateocao.pythonanywhere.com/contacts',

    // GET
  
    async getContacts() {
      try {
        const response = await fetch(this.url, { 
          method: 'GET' 
        });
        if (response.ok) {
          const contactsData = await response.json();
          return contactsData;
        } else {
          throw new Error('Error al cargar los contactos desde la base de datos.');
        }
      } catch (error) {
        throw new Error('Error al cargar los contactos desde la base de datos. Por favor, recargue la página.');
      }
    },

    // POST
  
    async addContact(contact) {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact)
        });
        if (response.ok) {
          const contactsData = await response.json();
          return contactsData;
        } else {
          throw new Error('Error al añadir el contacto.');
        }
      } catch (error) {
        throw new Error('Error al añadir el contacto. Por favor, inténtelo nuevamente.');
      }
    },

    // PUT
  
    async editContact(id, editedContact) {
      try {
        const response = await fetch(`${this.url}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editedContact)
        });
        if (response.ok) {
          const contactsData = await response.json();
          return contactsData;
        } else {
          throw new Error('Error al guardar la edición del contacto.');
        }
      } catch (error) {
        throw new Error('Error al guardar la edición del contacto. Por favor, inténtelo nuevamente.');
      }
    },

    // DELETE
  
    async deleteContact(id) {
      try {
        const response = await fetch(`${this.url}/${id}`, { 
          method: 'DELETE' 
        });
        if (response.ok) {
          const contactsData = await response.json();
          return contactsData;
        } else {
          throw new Error('Error al eliminar el contacto.');
        }
      } catch (error) {
        throw new Error('Error al eliminar el contacto. Por favor, inténtelo nuevamente.');
      }
    }
  };
  
  export default API;
  