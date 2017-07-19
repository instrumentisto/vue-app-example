#!/usr/bin/env bats


@test "contains node" {
  run docker run --rm --entrypoint sh $IMAGE -c 'which node'
  [ "$status" -eq 0 ]
}

@test "node runs ok" {
  run docker run --rm --entrypoint sh $IMAGE -c 'node -v'
  [ "$status" -eq 0 ]
}


@test "SHARE_APP=1 copies all files from /app/ to /shared/" {
  run docker run --rm -e SHARE_APP=0 $IMAGE sh -c \
    'cd /app && find . | sort'
  [ "$status" -eq 0 ]
  expected="$output"

  run docker run --rm -e SHARE_APP=1 $IMAGE sh -c \
    'cd /app && find . | sort'
  [ "$status" -eq 0 ]
  preserved="$output"

  run docker run --rm -e SHARE_APP=1 $IMAGE sh -c \
    'cd /shared && find . | sort'
  [ "$status" -eq 0 ]
  actual="$output"

  [ "$actual" == "$expected" ]
  [ "$preserved" == "$expected" ]
}


@test "PID 1 runs under 'node' user, not 'root'" {
  run docker run --rm $IMAGE 'stat -c "%U" /proc/1'
  [ "$status" -eq 0 ]
  [ "$output" == "node" ]
}
