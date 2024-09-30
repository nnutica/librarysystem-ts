import * as fs from 'fs';
//2 Define Book Model Using Interface and Enum
interface Book{
    id: number,
    title: string,
    author: string,
    genre: Genre,
    publishedyear: number,
};

enum Genre{
    Fiction="fiction",
    NonFiction="NonFiction",
    Fantasy="Fantasy",
    Learning="Learning"
}
interface AvailableBook extends Book {
    availability: "available";
  }
  
  
  interface CheckedOutBook extends Book {
    availability: "checked out";
    dueDate?: string; 
  }

type BookState = AvailableBook | CheckedOutBook;


//8 Create Class
class Library<T extends BookState>{
private inventory:T[] =[];

//3 Implement Basic Functions for Adding Books
 AddBook(book:T):void {
  this.inventory.push(book);
  console.log(`${book.title} by ${book.author} has been added to inventory.`);  
}
//4 Implement a Function to List All Books
 listbooks():void{
    if(this.inventory.length === 0){
       return console.log("No book in inventory now");    
   }  
   console.log("Listing all book in the inventory:")
   this.inventory.forEach((book)=>{
    console.log(`ID:${book.id}, title:${book.title} , author: ${book.author} status:${book.availability}`);
   })
}


//5  Implement Search Functionality Using keyof and typeof
 searchBooks<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.inventory.filter((book)=> book[key] === value);
}


//6 Add Update Book Functionality with Conditional Types 
 updatebook(id: number,updates:Partial<T>):void{
    const book = this.inventory.find((book)=>book.id === id)

    if (!book){
        return console.log(`Book with ID ${id} not found`);

    }
    Object.assign(book, updates);
    console.log(`The Book with ID ${id} has been updated`);
}

//7 Implement Deletion of Books Using Type Assertions
deletebook(id:number):void {
const index = this.inventory.findIndex((book) => book.id === id);
if (index !== -1){
    this.inventory.splice(index,1);
    console.log(`Book with ID ${id} has been deleted`)
} else{
    console.log(`Book with ID ${id} not found`);
}

}

checkOutBook(id: number, dueDate: string): void {
    const index = this.inventory.findIndex((book) => book.id === id);
    if (index !== -1 && this.inventory[index].availability === "available") {
      const checkedOutBook: CheckedOutBook = {
        ...this.inventory[index], 
        availability: "checked out", 
        dueDate,                    
      };
      this.inventory[index] = checkedOutBook as T;
      console.log(`Book with ID ${id} has been checked out and is due on ${dueDate}.`);
    } else {
      console.log(`Book with ID ${id} is either not available or not found.`);
    }
  }

  returnBook(id:number):void{
    const index = this.inventory.findIndex((book)=>book.id===id);
    if (index !== -1 && this.inventory[index].availability === "checked out") {
        
        const availableBook: AvailableBook = {
          ...this.inventory[index],  
          availability: "available", 
        };
      this.inventory[index]= availableBook as T ;
       console.log(`Book with ID ${id} has been returned and is now available.`); 
    }else {
        console.log(`Book with ID ${id} is either not checked out or not found.`);
      }
  }
  // Save inventory to file
  saveToFile(filePath: string): void {
    const data = JSON.stringify(this.inventory, null, 2);
    fs.writeFileSync(filePath, data);
    console.log('Inventory saved to file');
  }

  // Load inventory from file
  loadFromFile(filePath: string): void {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      this.inventory = JSON.parse(data) as T[];
      console.log('Inventory loaded from file');
    } else {
      console.log('File does not exist');
    }
  }
  displayBooks(): void {
    const bookListDiv = document.getElementById("bookList");
    if (bookListDiv) {
        bookListDiv.innerHTML = ""; // Clear existing content
        if (this.inventory.length === 0) {
            bookListDiv.innerHTML = "<p>No books in inventory.</p>";
            return;
        }
        let html = "<ul>";
        this.inventory.forEach(book => {
            html += `<li>ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Status: ${book.availability}</li>`;
        });
        html += "</ul>";
        bookListDiv.innerHTML = html; // Display updated book list
    }
}
  
}


export const library = new Library<BookState>();

library.AddBook({
    id:1,
    title:"Abz",
    author:"Yaimakmak",
    genre:Genre.Learning,
    publishedyear:2010,
    availability:"available"
});
library.AddBook({
    id:2,
    title:"เรียนแบบไหนให้อยากลาออก",
    author:"Yaimakmak",
    genre:Genre.Learning,
    publishedyear:2010,
    availability:"available", 
});

library.AddBook({
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: Genre.Fiction,
    publishedyear: 1925,
    availability: "available",
  });


  
// 1. Searching for a non-existent book
  console.log("\n--- Searching for non-existent book ---");
  const searchResult = library.searchBooks("title", "Non-existent Book");
  if (searchResult.length === 0) {
    console.log("No books found with the title 'Non-existent Book'.");
  } else {
    console.log(searchResult);
  }
  
  // 10.2) Updating a non-existent book
  console.log("\n--- Updating a non-existent book ---");
  library.updatebook(999, { title: "Non-existent Book" });
  
  // 10.3) Deleting a non-existent book
  console.log("\n--- Deleting a non-existent book ---");
  library.deletebook(999);
  
  // 10.4) Updating an existing book without any changes
  console.log("\n--- Updating an existing book without any changes ---");
  library.updatebook(1, {}); // No changes passed in the updates
  
  // 10.5) Searching for an existing book by genre
  console.log("\n--- Searching for an existing book by genre ---");
  const bookfound = library.searchBooks("author","Yaimakmak");
  if (bookfound.length === 0) {
    console.log("No books found in the Yaimakmak author.");
  } else {
    console.log(bookfound);
  }
  
  // 10.6) Trying to check out an already checked-out book
  console.log("\n--- Checking out a book ---");
  library.checkOutBook(1, "2024-10-01");
  console.log("\n--- Trying to check out the same book again ---");
  library.checkOutBook(1, "2024-11-01"); // Book is already checked out
  
  // 10.7) Trying to return a book that's already available
  console.log("\n--- Returning the checked-out book ---");
  library.returnBook(1);
  console.log("\n--- Trying to return the same book again ---");
  library.returnBook(1); // Book is already available
  
  // 10.8) Listing all books after performing operations
  console.log("\n--- Final inventory list after all operations ---");
  library.listbooks();


  library.saveToFile('inventory.json');
  library.loadFromFile('inventory.json');

  