import subprocess
import asyncio


def serve():
    f = subprocess.Popen(args=['ng', 's'], cwd='frontend/XavierPortal')
    try:
        subprocess.run(args=['python3', 'manage.py',
                             'runserver'], cwd='xavier_portal/')
    except KeyboardInterrupt:
        f.kill()


if __name__ == '__main__':
    serve()
