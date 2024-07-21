import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react"

function Test(props) {
  //test
  return (
    // <Card className="max-w-[400px]">
    // <div className="flex basis-1/6">
    <div className="h-full">
    <Card className="m-3">
    <CardHeader className="flex gap-3">
      <contrainer className="shrink-0" > 
      <Image
        alt="nextui logo"
        height={40}
        radius="full"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={40}
      />
      </contrainer>
      <div className="flex flex-col text-left">
        <p className="text-md">{props.item.name}</p>
        <p className="text-small text-default-500">{props.item.social_media}</p>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody>
      <p>{props.item.message}</p>
    </CardBody>
    {/* <Divider/>
    <CardFooter>
      <Link
        isExternal
        showAnchorIcon
        href="https://github.com/nextui-org/nextui"
      >
        Visit source code on GitHub.
      </Link>
    </CardFooter> */}
  </Card>
  </div>
  );
}

export default Test;