!!! FOR NOW IT'S IN EARLY ACCESS, SO THIS VERSION IS ONLY FOR LINUX SYSTEMS !!!

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

# For those who want to test this early version
1. Clone this repo:
```bash
git clone https://github.com/justTrueCodeWriter/main_homepage
```
2. Go to repo dir
```bash
cd main_homepage
```
3. Setup python virtual env
```bash
python -m venv lib
```
4. Start virtual env based on your shell (fish, bash, zsh)
```bash
# Bash/zsh
source lib/bin/activate
# Fish
source lib/bin/activate.fish
```
5. Install requirements
```bash
pip install -r requirements.txt
```
6. Create `~/org/Orgmode.org` and past this text
```org
* TODO Test1 :self:
SCHEDULED: <2025-07-29 Tue>

* DONE Test2 :self:
SCHEDULED: <2025-07-29 Tue>

* TODO Test3 :self:
SCHEDULED: <2025-07-30 Wed>
```
6. Start app
```bash
flask run
```
7. Open [link](http://127.0.0.1:5000/) in your browser
