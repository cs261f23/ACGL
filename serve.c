#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main() {
  int rc = fork();

  if (rc == 0) {
    chdir("./frontend/XavierPortal");
    char *x = "ng";
    char *argv[3];
    argv[0] = "ng";
    argv[1] = "serve";
    argv[2] = NULL;
    execvp(x, argv);
    exit(0);
  } else {
    chdir("./xavier_portal");

    char *x = "python3";
    char *argv[4];
    argv[0] = "python3";
    argv[1] = "manage.py";
    argv[2] = "runserver";
    argv[3] = NULL;
    execvp(x, argv);
    exit(0);
  }
}
