package student

import (
	"context"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// student

type Student struct {
	gorm.Model
	Name         string
	StudentEmail string
	studentID    int64
	Password     string
	Salt         []byte
}
type studentStore struct {
	db gorm.DB
}

func (ss *studentStore) NewStudentStore() {
	ss.Open(context.TODO())
}

var StudentStore studentStore

func (ss *studentStore) Get(ctx context.Context, optionalFilters map[string]string) *Student {

	ss.Open(ctx)

	var student Student

	s1 := ""
	s2 := ""
	for key, value := range optionalFilters {
		if s1 == "" {
			s1 = key + " = ?"
			s2 = value
		} else {
			s1 += "," + key + " = ?"
			s2 += "," + value
		}
	}
	ss.db.First(&student, s1, s2)

	return &student
}

func (ss *studentStore) Open(ctx context.Context) {
	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:geoffrey@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})
	// ss.db.AutoMigrate(&Student{})
	if err != nil {
		log.Fatal(err)
	}
	// err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	ss.db = *db
}

func (ss *studentStore) Create(ctx context.Context) {
	err := ss.db.Create(&Student{Name: "D42", StudentEmail: "fadf", Password: "f", Salt: []byte{byte(1)}, studentID: 12})
	if err != nil {
		println(err)
	}
}

/*  	db, err := gorm.Open(mysql.Open("test.db"), &gorm.Config{})
if err != nil {
	panic("failed to connect database")
}

// Migrate the schema
db.AutoMigrate(&Product{})

// Create
db.Create(&Product{Code: "D42", Price: 100})

// Read
var product Product
db.First(&product, 1)                 // find product with integer primary key
db.First(&product, "code = ?", "D42") // find product with code D42

// Update - update product's price to 200
db.Model(&product).Update("Price", 200)
// Update - update multiple fields
db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // non-zero fields
db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

// Delete - delete product
db.Delete(&product, 1) */
