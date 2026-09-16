#!/bin/bash

cd reasm32
    nasm -f elf32 the_thing.asm
cd ..
g++ -Og -g -m32 -lSDL3 linux_port/the_thing.cpp reasm32/the_thing.o -o build/terep2re_linux
