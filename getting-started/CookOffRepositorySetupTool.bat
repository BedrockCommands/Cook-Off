@echo off
title Cook Off! Repository Setup Tool

@REM set minecraftBedrockComMojangDirectory=%appdata%\Minecraft Bedrock\Users\Shared\games\com.mojang
set minecraftBedrockComMojangDirectory=%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
set repositoryDirectory=%CD%\..\
:: Resolve file path
pushd "%repositoryDirectory%" >nul
set repositoryDirectory=%cd%
popd

echo Welcome to the Cook Off! repository setup program. This tool need only be run once. At any time, if you would like to stop the program, type end.

:defaultFolderLocation
echo.
echo Would you like to proceed with the default folder locations? (y/n)
set /p res=
if _%res%==_end (goto eof)
if defined res (goto goodDefaultFolderLocationInput) else (goto invalidDefaultFolderLocationInput)
:goodDefaultFolderLocationInput
set rfc=%res:~0,1%
if /i _%rfc% EQU _y (goto runSetup)
if /i _%rfc% EQU _n (goto setFolderLocations)
goto invalidDefaultFolderLocationInput

:invalidDefaultFolderLocationInput
echo Invalid input. Please enter either y or n.
goto defaultFolderLocation

:setFolderLocations
:setupMinecraftBedrockComMojangDirectory
echo.
echo This tool assumes the default Minecraft com.mojang folder path (for you, %minecraftBedrockComMojangDirectory%). Is this the correct path? (y/n)
set /p res=

if _%res%==_end (goto eof)
if defined res (goto goodMinecraftBedrockComMojangDirectoryInput) else (goto invalidMinecraftBedrockComMojangDirectoryInput)
:goodMinecraftBedrockComMojangDirectoryInput
set rfc=%res:~0,1%
if /i _%rfc% EQU _y (goto setupRepositoryDirectory)
if /i _%rfc% EQU _n (goto changeMinecraftBedrockComMojangDirectory)
goto invalidMinecraftBedrockComMojangDirectoryInput

:invalidMinecraftBedrockComMojangDirectoryInput
echo Invalid input. Please enter either y or n.
goto setupMinecraftBedrockComMojangDirectory

:changeMinecraftBedrockComMojangDirectory
echo What is the absolute folder path of your com.mojang folder? This folder path should end in "com.mojang".
set /p minecraftBedrockComMojangDirectory=
goto setupRepositoryDirectory

:setupRepositoryDirectory
echo.
echo This tool assumes its location in the local clone of the Cook Off! repository has been unchanged, and retrieved the folder path of the Cook Off! repository (%repositoryDirectory%). Is this the correct path? (y/n)
set /p res=

if _%res%==_end (goto eof)
if defined res (goto goodRepositoryDirectoryInput) else (goto invalidRepositoryDirectoryInput)
:goodRepositoryDirectoryInput
set rfc=%res:~0,1%
if /i _%rfc% EQU _y (goto runSetup)
if /i _%rfc% EQU _n (goto changeRepositoryDirectory)
goto invalidRepositoryDirectoryInput

:invalidRepositoryDirectoryInput
echo Invalid input. Please enter either y or n.
goto setupRepositoryDirectory

:changeRepositoryDirectory
echo What is the absolute folder path of your local clone of the Cook Off! repository?
set /p minecraftBedrockComMojangDirectory=
goto runSetup

:runSetup
echo.
echo Setting up repository...
pause

:setupBP
echo.
echo Setting up behavior pack.
if exist %minecraftBedrockComMojangDirectory%\development_behavior_packs\cook-off-bp (
    echo Behavior pack seems to be already setup. Skipping.
    goto setupRP
)
robocopy %repositoryDirectory%\behavior_pack %minecraftBedrockComMojangDirectory%\development_behavior_packs\cook-off-bp /e /move
echo Behavior pack moved.
mklink /j %repositoryDirectory%\behavior_pack %minecraftBedrockComMojangDirectory%\development_behavior_packs\cook-off-bp
echo Behavior pack directory junction created.

:setupRP
echo.
echo Setting up resource pack.
if exist %minecraftBedrockComMojangDirectory%\development_resource_packs\cook-off-rp (
    echo Resource pack seems to be already setup. Skipping.
    goto setupGit
)
robocopy %repositoryDirectory%\resource_pack %minecraftBedrockComMojangDirectory%\development_resource_packs\cook-off-rp /e /move
echo Resource pack moved.
mklink /j %repositoryDirectory%\resource_pack %minecraftBedrockComMojangDirectory%\development_resource_packs\cook-off-rp
echo Resource pack directory junction created.

:setupGit
echo.
echo Setting up git to properly process directory junctions.
git config set --local core.symlinks true
echo Git now properly processes directory junctions for this repository.

echo.
echo Setup process complete. If you are new to contributing to this repository, please visit https://bedrockcommands.org/projects/cook-off/contributing
echo Press any key to close this program.

pause

:eof