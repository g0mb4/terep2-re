#openwatcom needs to be correctly set up for this to run
#this include is necessary for the github build
INCLUDE=/opt/watcom/h/nt:/opt/watcom/h
cd reasm32
    nasm -f win32 -DWIN32 the_thing.asm
cd ..
wrc -r -bt=nt win32/menu.rc
wcl386 -6 -os -zastd=c99 -bt=nt -l=nt_win reasm32/the_thing.obj win32/terep2re.c win32/menu.res shell32.lib user32.lib ole32.lib -fe=build/terep2re32.exe
