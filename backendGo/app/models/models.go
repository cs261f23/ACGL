package models

import (
	"context"
	"database/sql"
	"errors"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// student

type student struct {
	Name     string
	Email    string
	ID       int64
	Password string
	Salt     []byte
}
type studentStore struct {
	db *sql.DB
}

var StudentStore studentStore

func (cs *studentStore) Get(ctx context.Context) (*student, error) {
	cs.Open()
	defer cs.Close()
	row := cs.db.QueryRowContext(ctx, `SELECT * FROM xavier_portal.student;`)

	var c student
	err := row.Scan(&c.Name, &c.Email, &c.ID, &c.Password, &c.Salt)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}

	return &c, err
}

func (ss *studentStore) Open() {
	db, err := sql.Open("mysql",
		"root:root@tcp(localhost:3306)/xavier_portal")
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	ss.db = db
}

func (ss *studentStore) Close() {
	ss.db.Close()
}
