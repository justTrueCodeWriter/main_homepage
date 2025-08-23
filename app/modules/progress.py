def get_progress(filename: str):
    done_count = 0
    total_count = 0

    file = open(filename, 'r')
    for line in file:
        if "DONE" in line:
            done_count += 1
        if "DONE" or "TODO":
            total_count += 1
    file.close()

    return done_count*100/total_count
