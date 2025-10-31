To setup this repository on your machine, please follow the instructions below.

1. Ensure your Minecraft Bedrock copy is version 1.21.120 or higher.

2. Run the CookOffRepositorySetupTool.bat file and answer the prompts. If you face any issues, please let us know in the General thread on the Discord server.

Note: If you would like to view the contents of the file first, right click the file and select "Open With" and then your prefered text editor.

If you would prefer to run the commands manually, below are the commands with the default folder paths. These must be run from the root of your local clone of the repository.

- robocopy behavior_pack "%appdata%\Minecraft Bedrock\Users\Shared\games\com.mojang\development_behavior_packs\cook-off-bp" /e /move
- mklink /j behavior_pack "%appdata%\Minecraft Bedrock\Users\Shared\games\com.mojang\development_behavior_packs\cook-off-bp"
- robocopy resource_pack "%appdata%\Minecraft Bedrock\Users\Shared\games\com.mojang\development_resource_packs\cook-off-rp" /e /move
- mklink /j resource_pack "%appdata%\Minecraft Bedrock\Users\Shared\games\com.mojang\development_resource_packs\cook-off-rp"
- git config set --local core.symlinks true

3. Go to `worlds/Cook-Off!.mcworld` and open the file, or import the world file through Minecraft Bedrock (from the start screen: Play > Import world, select world file).

Make sure you have the latest version of Git, or at least a version of git higher than or equal to Git 2.32 (to check, run `git -v`).

For details on how to contribute, please click **[here](https://bedrockcommands.org/projects/cook-off/contributing)**.