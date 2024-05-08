<?php
// Check if file was uploaded without errors
if(isset($_FILES["mp3File"]) && $_FILES["mp3File"]["error"] == 0){
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["mp3File"]["name"]);
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
   
    
    // Allow only MP3 files
    if($fileType != "mp3") {
        echo "Sorry, only MP3 files are allowed.";
        $uploadOk = 0;
    }
    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["mp3File"]["tmp_name"], $target_file)) {
            echo "The file ". basename($_FILES["mp3File"]["name"]). " has been uploaded.";
            
            // Upload file to IPFS
            $ipfsHash = shell_exec("ipfs add $target_file");
            echo "IPFS Hash: $ipfsHash";
                
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
} else {
    echo "No file uploaded.";
}

