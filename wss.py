from PIL import Image
logo = Image.open("images/yda-logo.png").convert("RGBA")
size = 512
bg = Image.new("RGBA", (size, size), (10, 10, 10, 255))
logo.thumbnail((int(size*0.85), int(size*0.85)))
bg.paste(logo, ((size-logo.width)//2, (size-logo.height)//2), logo)
bg.save("images/favicon.png")
bg.resize((32, 32)).save("favicon.ico")