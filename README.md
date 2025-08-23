!!! THIS PROJECT STILL IN BETA SO THERE MAY BE BUGS IN THIS PROJECT !!!

# Full app preview
<img width="1693" height="796" alt="image" src="https://github.com/user-attachments/assets/82275dcb-65b9-43dd-8437-cb617c6a2245" />

# Overview features

## Bookmarks
<img width="272" height="270" alt="image" src="https://github.com/user-attachments/assets/8b9758a9-132e-40dd-8a5a-4013e1b8966c" /><br>

You can edit `~/.config/main_homepage/bookmarks.json` to set your own bookmarks.
## Pomodoro timer
<img width="272" height="325" alt="image" src="https://github.com/user-attachments/assets/4c115529-e1e8-4a3d-9a33-03eac6b1d87d" /><br>

Countdown timer with a maximum time of 1 hour, which can be adjusted using mouse movements.

## Emacs orgmode campatiable task manager
Org file example:
```org
* TODO Test1 :self:
SCHEDULED: <2025-07-29 Tue>

* DONE Test2 :self:
SCHEDULED: <2025-07-29 Tue>

* TODO Test3 :self:
SCHEDULED: <2025-07-30 Wed>
```
<img width="504" height="246" alt="image" src="https://github.com/user-attachments/assets/718d0844-a6fd-4efe-b4d7-0c918e3d1b0a" />

Daily schedule

---

<img width="504" height="183" alt="image" src="https://github.com/user-attachments/assets/8f841945-1947-423a-ae45-ead11f7ba7e1" />

List of all TODO tasks

---

<img width="500" height="708" alt="image" src="https://github.com/user-attachments/assets/54b78dc0-28f8-43a8-be1a-b9c1628aa9f0" />

7 Days agenda view

---

# Setup process

1. Make sure that you installed [Docker](https://docs.docker.com/engine/install/) and [Docker Buildx](https://github.com/docker/buildx) first
2. Clone this repo and go to project folder:
```bash
git clone https://github.com/justTrueCodeWriter/main_homepage
cd main_homepage
```
3. Build image:
```bash
docker build -t main_homepage .
```
4. First run container:
```bash
docker run -v ~/.config/main_homepage:/config/main_homepage -v ~/.symlinks/org:/org -d --name main_homepage -p 5000:5000 main_homepage:latest
```

**!!! You can change `<your path>:/config/main_homepage` and `<your path>:/org` of the config dir and org dir to your preferred. By that path you can change bookmarks in `bookmarks.json` and write or edit tasks in `Orgmode.org` and this changes will be automatically synced with main_homepage docker volume.**

App can be accessed by [this address](http://127.0.0.1:5000/)

3. After first run you can launch main homepage through `docker start main_homepage`. You can also add this command in startup script according to your system to launch main homepage automatically.

# If you want to use new release version you need to:

1. Rebuild docker image:
```bash
docker build -t main_homepage .
```
2. Remove old container(don't worry, if you spacified <your path> correctly, data will be saved on your host machine and not be deleted with container):
```bash
docker rm main_homepage 
```
3. Make first run:
```bash
docker run -v ~/.config/main_homepage:/config/main_homepage -v ~/.symlinks/org:/org -d --name main_homepage -p 5000:5000 main_homepage:latest
```

