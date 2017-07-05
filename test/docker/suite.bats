#!/usr/bin/env bats


@test "contains node" {
  run docker run --rm $IMAGE which node
  [ "$status" -eq 0 ]
}

@test "node runs ok" {
  run docker run --rm $IMAGE node -v
  [ "$status" -eq 0 ]
}


@test "contains java" {
  run docker run --rm $IMAGE which java
  [ "$status" -eq 0 ]
}

@test "java runs ok" {
  run docker run --rm $IMAGE java -help
  [ "$status" -eq 0 ]
}
