-- Compiled for osx 64 bit in executable file -> beziercircle

-- Usage:
-- beziercircle [circumference] [offest x] [offset y]
--
-- Example: 
-- beziercircle 500
--
-- # Thu Sep  1 09:05:18 2016 - author: Dave Thomas - dave.thomas@trader.ca 
-- # Copyright (c) 2016 Trader Corporation.  All rights reserved.
--
-- Calculates a circle using bezier paths for using in android
-- vector drawables
--
import System.Environment
import Text.Printf

bz = 0.552284749831
zero = read "0" :: Float

main = do
    args <- getArgs
    
    let c = parseArg 0 args
    let d = c / 2
    let ox = parseArg 1 args
    let oy = parseArg 2 args

    let ps = points d ox oy
    let cs = controls zero (ip d) (op d) c ox oy

    putStrLn $ (showMove (zero + ox, d + oy)) ++ (showAllCurves ps cs) ++ "Z"
    
    where
        parseArg i args = (if length args >= i + 1 then read (args !! i) :: Float else zero)

ip d = d - (d * bz)
op d = d + (d * bz)

controls a b c d x y = map (\(a, b, c, d) -> (a + x, b + y, c + x, d + y)) [c1, c2, c3, c4]
    where   c1 = (a, b, b, a)
            c2 = (c, a, d, b)
            c3 = (d, c, c, d)
            c4 = (b, d, a, c)


points d x y = map (\(x,y) -> (ox x, oy y)) [p2, p3, p4, p1]
    where   ox = (+x)
            oy = (+y)
            p1 = (zero, d)
            p2 = rotate90 p1
            p3 = offset d p2
            p4 = offset d p1

offset o (x, y) = (x + o, y + o)

rotate90 (x, y) = (y, x * (-1))

showMove (x, y) = printf "M %f %f \n" x y

showCurve (x, y) (cx1, cy1, cx2, cy2) = do
    printf "C %f %f %f %f %f %f \n" cx1 cy1 cx2 cy2 x y

showAllCurves as bs = concat $ zipWith (showCurve) as bs