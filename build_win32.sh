cd reasm32
    nasm -f win32 -DWIN32 the_thing.asm
cd ..

i686-w64-mingw32-windres win32/menu.rc -o win32/menu.o
i686-w64-mingw32-gcc -O1 -g --std=gnu23 -mwindows reasm32/the_thing.obj win32/terep2re.c win32/menu.o -lole32 -o build/terep2re32.exe
